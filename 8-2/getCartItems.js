//장바구니 아이템 목록 조회
const getCartItems = (req, res) => {
    const { user_id, selected } = req.body;

    let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price 
                    FROM cartItems LEFT JOIN books 
                    ON cartItems.book_id = books.id
                    WHERE user_id = ? AND cartItems.id IN (?)`;
    let values = [user_id, selected]
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    })
};