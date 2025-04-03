const Navbar = () => {
    return (
        <div className="border-b border-gray-400 h-22">
            <div className="container mx-auto">
                <div className="flex items-center gap-4">
                    <div className="h-20 w-20" style={{ backgroundImage: 'url("/favicon.svg")', backgroundSize: "contain" }} />
                    <h1 className="text-4xl text-primary">Adventure Chat</h1>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
