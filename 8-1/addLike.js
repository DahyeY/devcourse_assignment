const addLike = (req, res) => {

    const { id } = req.params;
    const { user_id } = req.body;

    let sql = "INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)";
    let values = [user_id, id];
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    })
};