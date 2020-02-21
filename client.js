/*

StAuth10065: Freny Patel, 000744054 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

*/

const axios = require('axios');

async function test1(){
	console.log('\nTest - 1\n\n');
	try{
		const post1 = await axios.post('http://localhost:3000/api',
													{
														status: "active",
														message: "Yo! i am active"
													});
		console.log(post1.data);
		const post2 = await axios.post('http://localhost:3000/api',
													{
														status: "offline",
														message: "user is offline"
													});
		console.log(post2.data);
		const post3 = await axios.post('http://localhost:3000/api',
													{
														status: "offline",
														message: "offline user"
													});
		console.log(post3.data);
		
		
		const put1 = await axios.put('http://localhost:3000/api/2',
													{
														status: "active",
														message: "now i got active from offline"
													});
		console.log(put1.data);
		
		const get1 = await axios.get('http://localhost:3000/api/1');
		console.log(get1.data);
		const get2 = await axios.get('http://localhost:3000/api/2');
		console.log(get2.data);
		const get3 = await axios.get('http://localhost:3000/api/3');
		console.log(get3.data);
		
	} catch(error){
		console.error(error);
	}
	
}

async function test2(){
	console.log('\n\nTest - 2\n');
	try{
		const put1 = await axios.put('http://localhost:3000/api',{
										usersdata:
										[
											{status: "active",
											message: "Yo 2! i am active"},
											{status: "offline",
											message: "i am offline"},
											{status: "active",
											message: "hey! i am online"},
											{status: "active",
											message: "hey4! i am online"}
										] });
		console.log(put1.data);
		
		const get1 = await axios.get('http://localhost:3000/api');
		console.log(get1.data);
		
		const delete1 = await axios.delete('http://localhost:3000/api/4');
		console.log(delete1.data);
		
		const get2 = await axios.get('http://localhost:3000/api');
		console.log(get2.data);
} catch(error){
		console.error(error);
	}
	
}

async function test3(){
	console.log('\n\nTest - 3 \n');
	try{
		const delete1 = await axios.delete('http://localhost:3000/api');
		console.log(delete1.data);
		
		const get1 = await axios.get('http://localhost:3000/api');
		console.log(get1.data);
		
		const put1 = await axios.put('http://localhost:3000/api',{
										usersdata:
										[
											{status: "active",
											message: "Yo 3! i am active"},
											{status: "active",
											message: "i am active"},
											{status: "active",
											message: "hey 3! i am online"},
											{status: "active",
											message: "hey4! i am online"}
										] });
		console.log(put1.data);
		
		const post1 = await axios.post('http://localhost:3000/api',
													{
														status: "active",
														message: "Yo! i am active"
													});
		console.log(post1.data);
		const post2 = await axios.post('http://localhost:3000/api',
													{
														status: "offline",
														message: "user is offline"
													});
		console.log(post2.data);
		const put2 = await axios.put('http://localhost:3000/api/8',
													{
														status: " non active",
														message: "just got updated - now i am offline"
													});
		console.log(put2.data);
		
		
		const delete2 = await axios.delete('http://localhost:3000/api/9');
		console.log(delete2.data);
		
		const get2 = await axios.get('http://localhost:3000/api');
		console.log(get2.data);
		
		console.log("ALL TESTS SUCCESSFUL")
		
} catch(error){
		console.error(error);
}
	
}

test1().then(test2).then(test3);