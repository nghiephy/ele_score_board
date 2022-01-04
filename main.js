courses = [
    {  name: "Vi - Tích phân C", credits: 3, score: 1},
    {  name: "Pháp luật đại cương", credits: 2, score: 3.5},
    {  name: "Mác-Lênin 1", credits: 2, score: 3.0},
    {  name: "Đại số tuyến tính", credits: 2, score: 3.5},
    {  name: "Sinh học đại cương", credits: 2, score: 3.5},
    {  name: "TT. Sinh học đại cương", credits: 1, score: 4},
    {  name: "Vật lý đại cương ", credits: 3, score: 2},
    {  name: "TT. Vật lý đại cương", credits: 1, score: 4},
    {  name: "TT. Hóa học đại cương 2", credits: 1, score: 3.5},
    {  name: "Mác-Lênin 2", credits: 3, score: 1.5},
    {  name: "Hóa học đại cương 1", credits: 2, score: 1},
    {  name: "Cơ sở văn hóa Việt Nam", credits: 2, score: 2.5},
    {  name: "Tư tưởng Hồ Chí Minh", credits: 2, score: 2.5},
    {  name: "Hóa lý 1", credits: 3, score: 1},
    {  name: "Hóa Hữu cơ 1", credits: 3, score: 2.5},
    {  name: "TT. Hóa Hữu cơ 1", credits: 1, score: 3},
    {  name: "Hóa phân tích 1", credits: 3, score: 2},
    {  name: "TT. Hóa Vô cơ 1 ", credits: 1, score: 2},
    {  name: "TT. Hóa phân tích 1", credits: 1, score: 3},
    {  name: "TT. Hóa Vô cơ 2", credits: 1, score: 3.5},
    {  name: "Hóa lý 2", credits: 3, score: 1},
    {  name: "TT. Hóa lý", credits: 2, score: 1},
    {  name: "Hóa phân tích 2", credits: 3, score: 1},
    {  name: "TT. Hóa hữu cơ 2", credits: 1, score: 3.5},
    {  name: "TT. Hóa phân tích 2", credits: 1, score: 4},
    {  name: "Đường lối cách mạng", credits: 3, score: 2},
    {  name: "Hóa học đại cương 2 ", credits: 3, score: 2},
    {  name: "Anh văn chuyên môn - Hóa học", credits: 2, score: 1},
    {  name: "Hóa vô cơ 1", credits: 3, score: 2.5},
    {  name: "Các phương pháp phân tích hiện đại", credits: 3, score: 2},
    {  name: "Phương pháp Nghiên cứu khoa học - Hóa học", credits: 1, score: 3.5},
    {  name: "TT. Hóa sinh học", credits: 1, score: 3.5},
    {  name: "Hóa môi trường", credits: 3, score: 1},
    {  name: "Nguyên lý bảo quản và chế biến thực phẩm", credits: 2, score: 3},
    {  name: "Hóa học thực phẩm", credits: 3, score: 2.5},
    {  name: "Hóa vô cơ 2", credits: 3, score: 1},
    {  name: "Phức chất", credits: 2, score: 4},
    {  name: "TT. Các phương pháp phân tích hiện đại", credits: 1, score: 4},
    {  name: "TT. Hóa môi trường", credits: 1, score: 3.5},
    {  name: "Các phương pháp phổ nghiệm hữu cơ", credits: 2, score: 2},
    {  name: "Phân tích kỹ thuật", credits: 3, score: 1.5},
    {  name: "Hóa sinh học", credits: 3, score: 3.5},
    {  name: "Hóa hữu cơ -2", credits: 3, score: 3.5},
    {  name: "Các phương pháp thống kê hóa học", credits: 2, score: 2},
    {  name: "điểm A hk1", credits: 9, score: 4},
    {  name: "điểm B hk1", credits: 2, score: 3},
    {  name: "điểm Dp hk1", credits: 3, score: 1.5},
]

var scoreBoard = document.querySelector('#score-board')
var nameInput = document.querySelector('#name');
var creditsInput = document.querySelector('#credits');
var scoreInput = document.querySelector('#score');
var displayScore = document.querySelector('#message_score__text')

loadCourses()
calculator()

function calScore() {
    var totalScore=0
    var totalCredit=0
    courses.forEach(course => {
        totalScore += course.score*course.credits
        totalCredit += course.credits
    })
    return (totalScore/totalCredit*1.0).toFixed(2)
}

function calculator() {
    let name = nameInput.value
    let credits = creditsInput.value
    let score = scoreInput.value
    if (name && credits && score) {
        courses.push({name: name, credits: Number(credits), score: parseFloat(score)})
    } else {
        alert("Thông tin chưa đủ zk ơi")
    }
    loadCourses()
    displayScore.innerText = calScore()
}

function alter() {
    let orderElement = document.querySelector('.auth-form__input-order')
    let creditsElement = document.querySelector('.auth-form__input-credits')
    let newElement = document.querySelector('.auth-form__input-score')

    orderCourse = orderElement.value
    creditsCourse = creditsElement.value
    newScore = newElement.value

    courses[orderCourse-1].score = parseFloat(newScore)
    courses[orderCourse-1].credits = Number(creditsCourse)
    loadCourses()
    displayScore.innerText = calScore()
    alert("Sửa điểm rồi á zk!")
}

function remove() {
    let orderRemove = prompt("Nhập STT zk muốn xóa nà:")
    let removeList = courses.splice(orderRemove-1, 1)

    loadCourses()
    displayScore.innerText = calScore()
    console.log(courses)
    
    alert(`A xóa học phần ${removeList[0].name} cho zk rồi á!`)
    
}


function loadCourses() {
    htmls = `
    <tr>
        <th>STT</th>
        <th>Tên HP</th>
        <th>Tín chỉ</th>
        <th>Điểm</th>
    </tr>
    `
    courses.forEach((course, index) => {
        htmls += `
        <tr>
            <th>${index+1}</th>
            <th>${course.name}</th>
            <th>${course.credits}</th>
            <th>${course.score}</th>
        </tr>
        `
    })

    scoreBoard.innerHTML = htmls
  }