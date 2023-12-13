// courses = [
//     {  name: "Pháp luật đại cương", credits: 2, score: 3.5},
//     {  name: "Triết học Mác - Lênin", credits: 3, score: 3},
//     {  name: "Kinh tế chính trị Mác - Lênin", credits: 2, score: 1.5},
//     {  name: "Chủ nghĩa xã hội khoa học", credits: 2, score: 1.5},
//     {  name: "Lịch sử Đảng Cộng sản Việt Nam", credits: 2, score: 2},
//     {  name: "Tư tưởng Hồ Chí Minh", credits: 2, score: 2.5},
//     {  name: "Cơ sở văn hóa Việt Nam", credits: 2, score: 2.5},
//     {  name: "Kỹ năng thuyết trình", credits: 2, score: 3.5},
//     {  name: "Lý thuyết dịch", credits: 2, score: 3.5},
//     {  name: "Đọc - Viết B2.1", credits: 3, score: 2.5},
//     {  name: "Nghe - Nói B2.1", credits: 3, score: 3},
//     {  name: "Tiếng Anh thư tín thương mại và văn phòng", credits: 3, score: 3},
//     {  name: "Ngữ âm thực hành cơ bản", credits: 3, score: 3.5},
// ]

var scoreBoard = document.querySelector('#score-board')
var nameInput = document.querySelector('#name');
var creditsInput = document.querySelector('#credits');
var scoreInput = document.querySelector('#score');
var displayScore = document.querySelector('#message_score__text')

getAllCourses()

function calScore(courses) {
    var totalScore=0
    var totalCredit = 0
    courses.forEach(course => {
        totalScore += course.score*course.credits
        totalCredit += course.credits
    })
    return (totalScore/totalCredit*1.0).toFixed(2)
}

function calculator(courses) {
    let name = nameInput.value
    let credits = creditsInput.value
    let score = scoreInput.value
    if (name && credits && score) {
        fetch('https://bc-api-yaio.onrender.com/score/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, credits: credits, score: score })
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
        }, networkError => {
            console.log(networkError.message);
        }).then(jsonResponse => {
            loadCourses(jsonResponse.newScore);
            displayScore.innerText = calScore(jsonResponse.newScore);
            return;
        })
    } else {
        alert("Thông tin chưa đủ zk ơi")
    }
    displayScore.innerText = calScore(courses)
}

function alter() {
    let orderElement = document.querySelector('.auth-form__input-order')
    let creditsElement = document.querySelector('.auth-form__input-credits')
    let newElement = document.querySelector('.auth-form__input-score')

    orderCourse = orderElement.value
    creditsCourse = creditsElement.value
    newScore = newElement.value

    fetch('https://bc-api-yaio.onrender.com/score/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ index: orderCourse - 1, credits: creditsCourse, score: newScore })
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Request failed!');
    }, networkError => {
        console.log(networkError.message);
    }).then(jsonResponse => {
        loadCourses(jsonResponse.newScore);
        displayScore.innerText = calScore(jsonResponse.newScore);
        alert("Sửa điểm rồi á zk!")
    })

}

function remove() {
    let orderRemove = prompt("Nhập STT zk muốn xóa nà:")
    
    fetch('https://bc-api-yaio.onrender.com/score/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ index: orderRemove - 1 })
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Request failed!');
    }, networkError => {
        console.log(networkError.message);
    }).then(jsonResponse => {
        loadCourses(jsonResponse.newScore);
        displayScore.innerText = calScore(jsonResponse.newScore)
        alert(`A xóa học phần ${removeList[0].name} cho zk rồi á!`)
    })

    
    
}

function loadCourses(courses) {
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

function getAllCourses() {
    fetch('https://bc-api-yaio.onrender.com/score', {
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Request failed!');
    }, networkError => {
        console.log(networkError.message);
    }).then(jsonResponse => {
        loadCourses(jsonResponse.data);
        calculator(jsonResponse.data);
    })
}