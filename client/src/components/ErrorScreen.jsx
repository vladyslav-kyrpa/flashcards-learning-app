export default function ErrorScreen({ error }) {
    return <div className="text-main-color text-center w-full mx-auto mt-10">
        <p className="font-bold">Error occured</p>
        <p>{error}</p>
    </div>
}