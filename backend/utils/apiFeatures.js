const match = require("nodemon/lib/monitor/match");

class APIFeatures{

    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    //creating Search method for searching particular product by name from DB
    search() {
        const keyword = this.queryStr.keyword ? {
            "name": {
                $regex: this.queryStr.keyword,
                $options: 'i'
           }
        } : {}
        
        this.query = this.query.find({ ...keyword });
        return this;
    }
    
    //creating the Filter method for filtering out keywords during searching products
    filter() {
        const queryCopy = { ...this.queryStr };
        
        
        //removing field from query string to get only that filter queryStr!
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(el => delete queryCopy[el]);
       //................................................ console.log(queryCopy);

        //ADVANCE FILTERS FOR PRICE RANGE
        let queryStr = JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match=>`$${match}`) // converting to string and then replacing lte/lt/gte/gt with the dollarsign to make it mongo expression compatible!
        //................................................console.log(queryStr);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        //we first find the current page on which user is!
        const skip = resPerPage * (currentPage - 1);
        //we skip the content if it is already in previous page!
        this.query = this.query.limit(resPerPage).skip(skip); //and we limit the results by passing the current page data and skipping the previously shown data!
        return this;
    }
    
}
module.exports = APIFeatures;