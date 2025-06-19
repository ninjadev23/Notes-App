type ButtonProps = {
    children: React.ReactNode
    onClick: () => void
    styles?: string
}
export default function Button ({children, onClick, styles}: ButtonProps){
    return (
        <button
              onClick={onClick}
              className={`max-h-9 flex justify-center items-center gap-1 p-2 hover:cursor-pointer hover:bg-black/60 bg-black/40 text-white rounded ${styles}`}
            >
                {children}
            </button>
    )
}