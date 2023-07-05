


export default function Login({ login, getSession }: { login: (password: number) => void, getSession: () => void }) {
    return (
        <div>
            <form onSubmit={
                (event) => {
                    event.preventDefault();
                    login(parseInt(event.target.groupid.value));
                    location.reload()
                }
            }
                className="flex flex-col max-w-xl gap-2 text-center"
            >
                <label htmlFor="groupid">Join Group with ID</label>
                <input type="text" id="groupid" name="groupid" className="border border-gray-400" />
                <label htmlFor="newgroupid">Create a new Group</label>
                <input type="text" id="newgroupid" className="border border-gray-400" />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}