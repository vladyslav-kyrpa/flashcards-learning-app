import { ActiveButton } from "./Buttons";

export function Confirmation({ message, onConfirm, onCancel }) {
    const actions = <div className="flex gap-2">
        <ActiveButton className="flex-1" onClick={onConfirm}>Confirm</ActiveButton>
        <ActiveButton className="flex-1" onClick={onCancel}>Cancel</ActiveButton>
    </div>
    return <DialogBox actions={actions} title="Confirmation" text={message} />
}

export function ErrorNotification({ onClose, message }) {
    return <DialogBox actions={<ActiveButton onClick={onClose} className="w-full">Ok</ActiveButton>}
        title="Something went wrong" text={message} />
}

function DialogBox({ title, text, actions }) {
    return <div className="z-10 bg-tinted fixed left-0 top-0 h-screen w-screen flex items-center justify-center">
        <div className="p-10 bg-surface rounded">
            <p className="font-bold mb-3 text-center">{title}</p>
            <p className="mb-5">{text}</p>
            {actions}
        </div>
    </div>
}

export default { Confirmation, ErrorNotification };

