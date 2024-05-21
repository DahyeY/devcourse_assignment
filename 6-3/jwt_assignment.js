router.post('/login',
    [
        body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
        body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
        validate
    ],
    function (req, res) {
        const { email, password } = req.body

        let sql = `SELECT * FROM users WHERE email = ?`
        conn.query(sql, email,
            function (err, results) {
                if (err) {
                    console.log(err)
                    return res.status(400).end()
                }
                var loginUser = results[0]

                if (loginUser && loginUser.password == password) {
                    //token 발급
                    const token = jwt.sign({
                        email: loginUser.email,
                        name: loginUser.name
                    }, process.env.PRIVATE_KEY, {
                        expiresIn: '30m',
                        issuer: "dahye"
                    });

                    res.cookie("token", token{
                        httpOnly: true
                    })

                    res.status(200).json({
                        message: `${loginUser.name}님 로그인 되었습니다.`,
                        token: token
                    })
                } else {
                    res.status(404).json({
                        message: "이메일 또는 비밀번호가 틀렸습니다."
                    })
                }
            }
        );

    })