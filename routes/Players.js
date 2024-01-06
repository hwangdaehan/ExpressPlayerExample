const express = require('express');
var router = express.Router();


/**
 * FakeDB로 사용할 Players 객체
 */
let players = [
   { id: 1,backNumber : '7', name: 'H-M-SON' ,position : 'fw'},
   { id: 2,backNumber : '11', name: 'D-H-HWANG',position : 'fw'},
   { id: 3,backNumber : '19', name: 'K-I-LEE',position : 'mf'},
   { id: 4,backNumber : '1', name: 'H-W-JO',position : 'gk'},
   { id: 5,backNumber : '9', name: 'K-S-JO',position : 'fw'},
   { id: 6,backNumber : '8', name: 'J-S-LEE',position : 'mf'},
   { id: 7,backNumber : '5', name: 'G-W-HAM',position : 'mf'},
   { id: 8,backNumber : '4', name: 'K-K-KANG',position : 'df'},
   { id: 9,backNumber : '3', name: 'M-J-KIM',position : 'df'},
   { id: 10,backNumber : '2', name: 'F-P-WAN',position : 'df'},
   { id: 11,backNumber : '68', name: 'W-J-LEE',position : 'gk'},
]


/**
 * 전체 데이터 조회
 */
router.get('/',(req,res) => {
    res.json(players);
});


/**
 * 선수 등록
 */
router.post('/',(req,res) => {
    let obj = {
        id : players.length+1,
        backNumber : req.body.backNumber,
        name : req.body.name,
        position : req.body.position
    }

    console.log(req.body);

    //insert
    players.push(obj);
    //select
    res.json(obj);
});

/**
 *선수 수정
 */
router.put('/:id', (req, res) => {
    const playerData = players.find(p => p.id === parseInt(req.params.id));
    if(!playerData) {
       return res.status(404).send('no data id :' + req.params.id);
    }

    playerData.backNumber =  req.body.backNumber ? req.body.backNumber : playerData.backNumber ;
    playerData.name =  req.body.name ? req.body.name : playerData.name;
    playerData.position =  req.body.position ? req.body.position : playerData.position;

    res.json(playerData);
 });

/**
 *선수 삭제
 */
router.delete('/:id', (req, res) => {
    const playerData = players.find(p => p.id === parseInt(req.params.id));
    if(!playerData) {
        return res.status(404).send('no data id :' + req.params.id);
    }

    const idx = players.indexOf(playerData);
    players.splice(idx, 1);
    res.json(playerData);
 });


/**
 * 포지션 별 데이터 조회
 */
router.get('/:position', (req, res) => {
    console.log(req);
    const result = players.filter(p => p.position === req.params.position);
    
    if(result.length < 1)
        console.log("empty array");
    
    console.log(result);
    res.json(result);
 });



module.exports = router;