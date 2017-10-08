/**
 * Created by Afraz on 10/8/2017.
 */

var express = require('express');
var router = express.Router();

var fs = require('fs');
var files = fs.readdirSync(__dirname + '/');

files.forEach(function (file) {
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
        var name = file.replace('.js', '');
        name = require('./' + file);
        router.use(name);
    }
});

module.exports= router