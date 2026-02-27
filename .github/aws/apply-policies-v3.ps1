$ErrorActionPreference = 'Stop'

$accountId = '730335447294'
$userName = 'github-actions-deploy'
$policyName = 'github-actions-s3-deploy-policy'

$policyDocPath = '.github/aws/policies-ready-v3.json'
$tmpIamPolicyPath = Join-Path $env:TEMP 'github-actions-s3-deploy-policy.json'
$tmpBucketCdnPath = Join-Path $env:TEMP 'bucket-cdn-policy.json'
$tmpBucketStaticsPath = Join-Path $env:TEMP 'bucket-statics-policy.json'

$data = Get-Content $policyDocPath -Raw | ConvertFrom-Json
$data.iamPolicyDocument | ConvertTo-Json -Depth 20 | Set-Content $tmpIamPolicyPath -Encoding utf8
$data.bucketPolicyForCdn | ConvertTo-Json -Depth 20 | Set-Content $tmpBucketCdnPath -Encoding utf8
$data.bucketPolicyForStatics | ConvertTo-Json -Depth 20 | Set-Content $tmpBucketStaticsPath -Encoding utf8

Write-Host 'Creating IAM user (if missing)...'
try {
  aws iam get-user --user-name $userName | Out-Null
  Write-Host "User '$userName' already exists."
} catch {
  aws iam create-user --user-name $userName | Out-Null
  Write-Host "User '$userName' created."
}

Write-Host 'Creating customer-managed policy (if missing)...'
$policyArn = "arn:aws:iam::$accountId:policy/$policyName"
try {
  aws iam get-policy --policy-arn $policyArn | Out-Null
  Write-Host "Policy '$policyName' already exists, creating new default version."
  aws iam create-policy-version --policy-arn $policyArn --policy-document "file://$tmpIamPolicyPath" --set-as-default | Out-Null
} catch {
  aws iam create-policy --policy-name $policyName --policy-document "file://$tmpIamPolicyPath" | Out-Null
}

Write-Host 'Attaching policy to user...'
aws iam attach-user-policy --user-name $userName --policy-arn $policyArn | Out-Null

Write-Host 'Applying bucket policy (CDN)...'
aws s3api put-bucket-policy --bucket rocketseat-upload-widget-web-cdn --policy "file://$tmpBucketCdnPath" | Out-Null

Write-Host 'Applying bucket policy (Statics)...'
aws s3api put-bucket-policy --bucket rocketseat-upload-widget-web-statics --policy "file://$tmpBucketStaticsPath" | Out-Null

Write-Host 'Creating access key for CI user...'
$key = aws iam create-access-key --user-name $userName | ConvertFrom-Json

Write-Host 'Done. Configure these GitHub Secrets:'
Write-Host "AWS_ACCESS_KEY_ID=$($key.AccessKey.AccessKeyId)"
Write-Host "AWS_SECRET_ACCESS_KEY=$($key.AccessKey.SecretAccessKey)"
Write-Host ''
Write-Host 'Security note: save the secret now; it will not be shown again.'
