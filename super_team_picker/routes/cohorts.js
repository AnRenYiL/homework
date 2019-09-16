const express = require('express');
const router = express.Router();
const knex = require('../client');

router.get('/', (req, res) => {
    knex("cohorts")
        .select("*")
        .orderBy("id", "asc")
        .then((data) => {
            res.render("cohorts/index", {
                pageTitle: "Team Picker",
                cohorts: data,
            });
        });
});

router.get('/new', (req, res) => {
    res.render("cohorts/cohortEdit", {
        pageTitle: "Super Team Picker",
        cohort: null
    });
});

router.post('/', (req, res) => {
    const cohortParmas = {
        members: req.body.members,
        name: req.body.name,
        logoUrl: req.body.logoUrl
    };
    knex("cohorts").insert(cohortParmas).returning("id").then(data => {
        res.redirect(`/cohorts/${data[0]}`);
    })
});

router.get('/:id', (req, res) => {
    knex("cohorts")
        .select("*")
        .where({
            id: req.params.id
        })
        .then(data => {
            let memberList = null;
            let isTeamCount = null;
            let isMemberCount = null;
            let inputNumb = null;
            if (req.query.method && req.query.quantity) {
                memberList = [];
                let members = data[0].members.split(',');
                let teamCout, memberCout, remainder;
                inputNumb = parseInt(req.query.quantity);
                if (req.query.method == 'perTeam') {
                    isMemberCount = 'checked';
                    memberCout = inputNumb;
                    teamCout = Math.floor(members.length / memberCout);
                    remainder = members.length % memberCout;
                } else {
                    isTeamCount = 'checked';
                    teamCout = inputNumb;
                    memberCout = Math.floor(members.length / teamCout);
                    remainder = members.length % teamCout;
                }
                for (let i = 0; i < teamCout; i++) {
                    let temp = [];
                    for (let j = 0; j < memberCout; j++) {
                        let random = parseInt(Math.random() * (members.length));
                        temp.push(members.splice(random, 1).toString());
                    }
                    memberList.push(temp);
                }
                if (remainder != 0) {
                    if (req.query.method == 'perTeam') {
                        let temp = [];
                        for (let i = 0; i < remainder; i++) {
                            temp.push(members[i]);
                        }
                        memberList.push(temp);
                    } else {
                        for (let i = 0; i < remainder; i++) {
                            memberList[i].push(members[i]);
                        }
                    }
                }
            }
            res.render("cohorts/showSingle", {
                pageTitle: "Team Picker",
                cohort: data[0],
                memberList: memberList,
                isTeamCount: isTeamCount,
                isMemberCount: isMemberCount,
                quantity: inputNumb
            });
        });
});

router.get('/:id/edit', (req, res) => {
    knex("cohorts")
        .select("*")
        .where({
            id: req.params.id
        })
        .then((data) => {
            res.render('cohorts/cohortEdit', {
                pageTitle: "Super Team Picker",
                cohort: data[0]
            });
        });
});

router.patch('/:id', (req, res) => {
    const cohortParmas = {
        members: req.body.members,
        name: req.body.name,
        logoUrl: req.body.logoUrl
    };
    knex("cohorts")
        .where({
            id: req.params.id
        })
        .update(cohortParmas).returning("*")
        .then(data => {
            res.render("cohorts/showSingle", {
                pageTitle: "Team Picker",
                cohort: data[0],
                memberList: null,
                isTeamCount: null,
                isMemberCount: null,
                quantity: null
            });
        });
});

router.delete('/:id', (req, res) => {
    knex("cohorts")
        .where({
            id: req.params.id
        })
        .delete()
        .then((data) => {
            res.redirect("/cohorts");
        });
});

module.exports = router;