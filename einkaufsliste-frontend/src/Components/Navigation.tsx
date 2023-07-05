
const style = {
    button: "bg-cyan-900 px-2 pb-0.5 text-center text-white rounded-lg"
}


export default function Navigation({onDeleteAll, logout}: {onDeleteAll: () => void, logout: () => void}) {
    return (
        <div className="flex items-center gap-5 h-14 bg-slate-400">
            <h1 className="text-3xl pb-1 hover:cursor-pointer">Navigation</h1>
            <button className={style.button} onClick={logout}>Logout</button>
            <button className={style.button} onClick={onDeleteAll}>Delete All</button>
        </div >
    )
}