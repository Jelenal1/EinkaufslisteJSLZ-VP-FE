
const style = {
    button: "bg-cyan-900 px-2 pb-0.5 text-center text-white rounded-lg"
}


export default function Navigation() {
    return (
        <div className="flex items-center gap-5 h-14 bg-slate-400">
            <h1 className="text-3xl pb-1 hover:cursor-pointer">Navigation</h1>
            <button className={style.button}>Tasks</button>
            <button className={style.button}>Login</button>
        </div >
    )
}