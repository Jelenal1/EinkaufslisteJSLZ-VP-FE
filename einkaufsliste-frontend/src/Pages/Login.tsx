


export default function Login({ login }: { login: (password: number) => void}) {
    return (
        <div>
            <form onSubmit={
                (event) => {
                    event.preventDefault();
                    login(parseInt(event.target.groupid.value));
                }
            }
                className="flex flex-col max-w-xl gap-2 text-center mx-auto mt-32 border bg-slate-400 rounded-lg p-2">
                <label htmlFor="groupid">Join Group with ID</label>
                <input type="text" id="groupid" name="groupid" className="rounded-xl" />
                <label htmlFor="newgroupid">Create a new Group</label>
                <input type="text" id="newgroupid" className="rounded-2xl" />
                <input type="submit" value="Login" className="rounded-xl bg-slate-200 w-20 mx-auto" />
            </form>
        </div>
    )
}