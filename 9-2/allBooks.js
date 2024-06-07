const allBooks = (req, res) => {
    let allBooksResponse = {};
    let { category_id, news, limit, currentPage } = req.query;
    // limit 페이지 당 도서 수
    // currentPage : 현재 몇 페이지인지
    // offset : limit * (currentPage - 1)
    let offset = limit * (currentPage - 1);

    let sql = "SELECT SQL_CALC_FOUND_ROWS *, (SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes FROM books";
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

    sql += " LIMIT ? OFFSET ?";
    values.push(parseInt(limit), offset);

    conn.query(sql, values,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            if (results.length)
                allBooksResponse.books = results;
            else
                return res.status(StatusCodes.NOT_FOUND).end();
        }
    )
    sql = "SELECT found_rows()";
    conn.query(sql,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            let pagination = {};
            pagination.currentPage = parseInt(currentPage);
            pagination.totalCount = results[0]["found_rows()"];

            allBooksResponse.pagination = pagination;

            return res.status(StatusCodes.OK).json(allBooksResponse);
        }
    )
};