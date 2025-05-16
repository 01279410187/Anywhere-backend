export const login = async (req, res) => {
    req.session.loggedIn = true;
    res.json({ success: true, message: 'Logged in successfully' });
};

export const logout = async (req, res) => {
    req.session.destroy();
    res.json({ success: true, message: 'Logged out successfully' });
};