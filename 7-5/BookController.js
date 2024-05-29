// 페이징 구현
const allBooks = (req, res) => {
    let { category_id, news, limit, currentPage } = req.query;
    // limit 페이지 당 도서 수
    // currentPage : 현재 몇 페이지인지
    // offset : limit * (currentPage - 1)
    let offset = limit * (currentPage - 1);
    let sql = "SELECT * FROM books";
    let values = [];
    if (category_id && news) {
        sql += " WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
        values.push(parseInt(category_id));
    }
    else if (category_id) {
        sql += " WHERE category_id = ? ";
        values.push(parseInt(category_id));
    }
    else if (news) {
        sql += " WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
    }

    sql += "LIMIT ? OFFSET ?";
    values.push(parseInt(limit), offset);

    conn.query(sql, values,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            if (results.length)
                return res.status(StatusCodes.OK).json(results);
            else
                return res.status(StatusCodes.NOT_FOUND).end();
        })

};