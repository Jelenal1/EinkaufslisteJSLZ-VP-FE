


export default function Login({ login }: { login: () => void }) {
    return (
        <div>
            <form onSubmit={
                (event) => {
                    event.preventDefault();
                    login();
                }
            }>
                <label htmlFor="groupid">GroupID</label>
                <input type="text" id="groupid" />
                <label htmlFor="newgroupid">Create a new Group</label>
                <input type="text" id="newgroupid" />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}