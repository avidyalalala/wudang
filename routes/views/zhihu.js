var keystone = require('keystone');

/*
        //customerScript by Lina 20150731 night
        _helpers.customerScript = function(script) {
            if(script==""|| script==undefined||script==null||script=={}){
                return "";}
            return ""; 
        } 
*/
exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Set locals
	//locals.section = 'blog';
	locals.filters = {
		post: req.params.post
	};
	locals.data = {
		posts: []
	};
        locals.isZhihu=true;

	
	// Load the current post
	view.on('init', function(next) {
		
		var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.filters.post
		}).populate('author categories');
		
		q.exec(function(err, result) {
			locals.data.post = result;
			next(err);
		});
		
	});
	
	// Load other posts
	view.on('init', function(next) {
		
		var q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');
		
		q.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});
		
	});
	
	// Render the view
	view.render('zhihu');
        
        //Render the view with other layout
	//view.render('zhihu',{layout:'blank'});
	
};
