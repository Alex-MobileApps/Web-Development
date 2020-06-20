$(document).ready(function() {

	let quotes;
	let fetched = false;

	const setQuote = () => {
		const quote = quotes[Math.floor(Math.random() * quotes.length)];
		if (quote.author === null) quote.author = "Unnamed Author";
		$("#tweet-quote").attr("href", "https://twitter.com/intent/tweet?&text=" + encodeURIComponent(`"${quote.text}" - ${quote.author}`));
		$("#tumblr-quote").attr("href", "http://tumblr.com/widgets/share/tool?posttype=quote&content=" + encodeURIComponent(quote.text) + "&caption=" + encodeURIComponent(quote.author) + "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button");
		setText(quote.text, quote.author);
	};

	const setText = (text, author) => {
		$("#box-bottom").animate({opacity: 0}, 250, function() {
			$("#text").text(text);
			$("#author").text(author);
			$(this).animate({opacity: 1}, 250)
		});
	}

	const setQuotes = data => {
		quotes = data;
		fetched = true;
		setQuote();
	}

	const getQuotes = () => {
		$.ajax({
			async: true,
			crossDomain: true,
			method: "GET",
			url: "https://type.fit/api/quotes",
			success: response => setQuotes(response),
			error: () => {
				if (localQuotes) return setQuotes(localQuotes);
				setText("Unable to retrieve quotes.", "Please try again later");
			}
		});
	}

	$("#new-quote").click(function(event) {
		event.preventDefault();
		fetched ? setQuote() : getQuotes();
	});
	
	getQuotes();
});

const localQuotes = [
	{"text":"Genius is one percent inspiration and ninety-nine percent perspiration.","author":"Thomas Edison"},
	{"text":"You can observe a lot just by watching.","author":"Yogi Berra"},
	{"text":"A house divided against itself cannot stand.","author":"Abraham Lincoln"},
	{"text":"Difficulties increase the nearer we get to the goal.","author":"Johann Wolfgang von Goethe"},
	{"text":"Fate is in your hands and no one elses","author":"Byron Pulsifer"},
	{"text":"Be the chief but never the lord.","author":"Lao Tzu"},
	{"text":"Nothing happens unless first we dream.","author":"Carl Sandburg"},
	{"text":"Well begun is half done.","author":"Aristotle"},
	{"text":"Life is a learning experience, only if you learn.","author":"Yogi Berra"},
	{"text":"Self-complacency is fatal to progress.","author":"Margaret Sangster"}
];