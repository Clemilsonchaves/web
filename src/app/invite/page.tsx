import Image from 'next/image'
import { Ranking } from './ranking'

import logo from '../../assets/logo.svg'
import { InviteLinkInput } from './invite-link-input'
import { Stats } from './stats'

export default function InvitePage() {
  return (
    <div className="min-h-dvh flex items-center justify-between  gap-16 flex-col md:flex-row">
      <div className="flex flex-col gap-10 w-full max-w-[550px]">
        <Image src={logo} alt="devstage" width={108.5} height={30} />

        <div className="space-y-2">
          <h1 className="text-4xl  leading-none font-heading font-semibold ">
            Inscrição Confirmada!
          </h1>
          <p className="text-gray-300">
            Para entrar no evento, acesse o link enviado para seu e-mail.
          </p>
        </div>

        <div className="space-x-6">
          <div className="space-y-3">
            <h2 className="text-gray-200 text-xl font-heading font-semibold leading-none">
              Indique e ganhe!
            </h2>
            <p className="text-gray-300">
              Convide mais pessoas para o evento e concorra a prêmios
              exclusivos! É só compartilhar o link.
            </p>
          </div>

          <InviteLinkInput />

          <Stats />
        </div>
      </div>

      <Ranking />
    </div>
  )
}
