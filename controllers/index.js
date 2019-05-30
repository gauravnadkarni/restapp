module.exports = (function(){
    return {
        index : (req,res,next) => {
            res.status(200);
            res.send('Its Working');
        }
    }
})();