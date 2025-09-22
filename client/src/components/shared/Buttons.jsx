import Sound from "../../assets/sounds/button-click-sound.wav";

export function ActiveButton({children, onClick, className}){
    const classes = `${className} ${
        "p-2 shadow rounded text-negative-main-color border border-active bg-active-gradient pop-on-hover"
    }`;

    return <button onClick={onClick} className={classes}>
        {children}
    </button>
}

export function IconButton({icon, onClick, className}){
    const handleOnClick = () => {
        const audio = new Audio(Sound);
        audio.play().finally(()=>{
        });
        onClick();
    }
    const classes = `${className} ${
        "rounded pop-on-hover" 
    }`;

    return <button onClick={handleOnClick} className={classes}>
        <img src={icon} height={32} width={32} alt="" />
    </button>
}

export default { ActiveButton, IconButton }