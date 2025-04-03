const Navbar = () => {
    return (
        <div className="border-b border-gray-400 h-22">
            <div className="max-w-4xl mx-auto h-full px-4">
                <div className="flex items-center gap-4 h-full">
                    <div className="h-16 w-16" style={{ backgroundImage: 'url("/favicon.svg")', backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} />
                    <h1 className="text-4xl text-primary">Adventure Chat</h1>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
