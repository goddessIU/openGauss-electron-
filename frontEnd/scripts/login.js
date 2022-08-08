const usernameInput = document.querySelector('#username')
const passwordInput = document.querySelector('#password')
const tip = document.querySelector('#tip')
const loginBut = document.querySelector('#loginBut')


loginBut.addEventListener('click', toLogin)

async function toLogin(e) {
    e.preventDefault()

    const username = usernameInput.value.trim()
    const password = passwordInput.value.trim()

    if (username === '' || password === '') {
        tip.textContent = '请输入账户或密码'
        return
    }

    const sql = `
            SELECT * FROM Users 
            WHERE username = '${username}';
            `

    try {
        const res = await window.electronAPI.openFile(sql)
        console.log('res', res)
        if (res.rows && res.rows.length > 0) {
            tip.textContent = '成功'
            location.href = './firstPage.html'
            return
        } else {
            tip.textContent = '不存在请先注册'
            return
        }
    } catch (e) {
        tip.textContent = '不存在请先注册'
        return
    }
}