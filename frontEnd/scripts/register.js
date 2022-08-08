const usernameInput = document.querySelector('#username')
const passwordInput = document.querySelector('#password')
const tip = document.querySelector('#tip')
const registerBut = document.querySelector('#registerBut')


registerBut.addEventListener('click', toRegister)

async function toRegister(e) {
    e.preventDefault()

    const username = usernameInput.value.trim()
    const password = passwordInput.value.trim()

    if (username === '' || password === '') {
        tip.textContent = '请输入账户或密码'
        return
    }

    const sql = `
            SELECT * FROM Users 
            WHERE username = '${username}'
        `
    try {
        const res = await window.electronAPI.openFile(sql)
        console.log('res', res)
        if (res.rows) {
            tip.textContent = '账号重复'
            return
        }
    } catch (e) {
        tip.textContent = '账号重复'
        return
    }
    tip.textContent = ''
    const sqlInsert = `
        CALL  insert_data(param1:='${username}',param2:='${password}');
        `
    try {
        const resInsert = await window.electronAPI.openFile(sqlInsert)
        console.log('resInsert', resInsert)
        tip.textContent = '成功'
        return
    } catch (e) {
        tip.textContent = '网络问题'
        return
    }
}