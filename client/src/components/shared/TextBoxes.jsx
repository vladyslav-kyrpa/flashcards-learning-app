export function TextBox({onChange, value, className, placeholder, name, hidden }) {
    return <input name={name} 
        placeholder={placeholder}
        type={hidden ? "password": "text"}
        className={`
            w-full 
            box-border
            rounded
            border border-surface
            bg-sub-surface
            px-3 py-2
            text-base
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
            ${className ?? ""}
        `}
        onChange={(e)=>onChange(e.target.value)} 
        value={value}/>
}

export function TextArea({ onChange, value, className, rows = 3 }){
  return (
    <textarea value={value} rows={rows} onChange={(e) => onChange(e.target.value)}
      className={`
        w-full
        box-border
        rounded
        border border-surface
        bg-sub-surface
        px-3 py-2
        text-base
        resize-none
        focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
        ${className ?? ""}
      `}
    />
  )
}


export default { TextBox, TextArea };