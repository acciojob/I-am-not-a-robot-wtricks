//your code here
const container = document.getElementById("container");
const resetBtn = document.querySelector("#reset");
const verifyBtn = document.querySelector("#verify");

const renderImages = () => {
	const randomArray = [1,2,3,4,5, (Math.floor(Math.random() * 5)) + 1]
		.sort(() => 0.5 - Math.random());
	
	let imageString = "";
	for(let i = 0; i < 6; i++) {
		imageString += `<img class="img${randomArray[i]}" alt="img${randomArray[i]}">`
	}

	container.innerHTML = imageString;
	resetBtn.style.display = verifyBtn.style.display = 'none';
	let p = document.querySelector("p");
	p && p.remove();
	
	let countSelected = 0;

	container.querySelectorAll("img").forEach(e => {
		e.onclick = () => {
			const isSelected = e.className.includes("selected");
			if (!isSelected && countSelected == 2) {
				return;
			}

			countSelected = isSelected
				? countSelected - 1
				: countSelected + 1;
			
			e.classList.toggle("selected");

			resetBtn.style.display = countSelected > 0 ? 'block' : 'none' 
			verifyBtn.style.display = countSelected == 2 ? 'block' : 'none' 
		}
	})
}

renderImages();

resetBtn.onclick = renderImages;
verifyBtn.onclick = () => {
	let last = "";
	container.querySelectorAll("img").forEach(e => {
		const isSelected = e.className.includes("selected");
		if (isSelected) {
			if (last == "") {
				last = e.getAttribute("alt");
				return
			} 
			
			const p = document.createElement("p");
			p.setAttribute("id", "para");
			
			p.textContent = last != e.getAttribute("alt")
					? "We can't verify you as a human. You selected the non-identical tiles. "
					: "You are a human. Congratulations!";
			
			document.querySelector("main").appendChild(p);
		}
	})		
}