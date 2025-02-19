interface ButtonProps {
  text: string;
}
export function Button(props: ButtonProps) {
  return ( 
  <button className="px-5 h-12 bg-gray-500 text-blue font-semibold rounded-xl w-full cursor-pointer transition-colors duration-200 hover:bg-blue hover:text-gray-900" >
    {props.text || "Enviar"}
    
  </button>
  );
}