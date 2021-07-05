var xhr;

function main() {
    try {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xhr = new XMLHttpRequest();
        }
        else if (window.ActiveXObject) {
            // code for IE6, IE5
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        else {
            throw new Error('Cannot create XMLHttpRequest object');
        }

    } catch (e) {
        alert('"XMLHttpRequest failed!' + e.message);
    }

    getBusinessCards();
}


function getBusinessCards() {
    xhr.addEventListener('readystatechange', processList, false);
    xhr.open('GET', 'http://localhost:8080/backend/BusinessCards/');
    xhr.send();

}


function processList() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var jsonResponse = JSON.parse(xhr.responseText);

        var listLoc = document.getElementById('list')

        for (var i = 0; i < jsonResponse.length; i++) {
            var id = jsonResponse[i].id

            let p = document.createElement('p');
            let div = document.createElement('div');
            div.className = 'businesscard';

            let divDN = document.createElement('div');
            divDN.className = 'displayname';

            let name = document.createElement('input');
            name.id = id + '_name';
            name.type = 'text';
            name.className = 'textInput';
            name.value = jsonResponse[i].name

            let surName = document.createElement('input');
            surName.id = id + '_surName';
            surName.type = 'text';
            surName.className = 'textInput';
            surName.value = jsonResponse[i].surName

            let telephone = document.createElement('input');
            telephone.id = id + '_telephone';
            telephone.type = 'text';
            telephone.className = 'textInput';
            telephone.value = jsonResponse[i].telephone

            let email = document.createElement('input');
            email.id = id + '_email';
            email.type = 'text';
            email.className = 'textInput';
            email.value = jsonResponse[i].email

            let btnRemove = document.createElement('button');
            btnRemove.innerHTML = 'Remove';
            btnRemove.id = 'remove_' + id;
            btnRemove.onclick = function() {
               delCard(this.id);
            }

            let btnUpdate = document.createElement('button');
            btnUpdate.innerHTML = 'Update';
            btnUpdate.id = 'update_' + id;
            btnUpdate.onclick = function() {
               updateCard(this.id);
            }

            let img = new Image();
            img.id = id + '_image';
            let imgBase64 = jsonResponse[i].image.replace(/\n|\r/g, "");
            img.src = imgBase64
            img.className = 'bcImage';

            listLoc.appendChild(p);
            p.appendChild(div);
            div.appendChild(img);
            div.appendChild(divDN);
            divDN.appendChild(name);
            divDN.appendChild(surName);
            div.appendChild(telephone);
            div.appendChild(document.createElement('br'));
            div.appendChild(email);
            div.appendChild(document.createElement('br'));
            p.appendChild(btnRemove);
            p.appendChild(btnUpdate);

        }
    }
}

function delCard(buttonId) {
    let id = buttonId.replace("remove_", "");
    xhr.open('DELETE', 'http://localhost:8080/backend/BusinessCards/?id=' + id );
    xhr.send();
    location.reload();
}

function addCard() {
    let name = document.getElementById('name').value;
    let surName = document.getElementById('surName').value;
    let telephone = document.getElementById('telephone').value;
    let email = document.getElementById('email').value;
    let fileInput = document.getElementById('image');

    if (name == "" || surName == "" || telephone == "" || email == "" || !fileInput.files[0]) {
        alert("All fields are required");
    } else {
        if (fileInput.files[0].size / 1024 < 10) {
            let reader = new FileReader();
            reader.readAsDataURL(fileInput.files[0]);
            reader.onload = function () {

                let query = '&name=' + name + '&surName=' + surName + '&telephone=' + telephone + '&email=' + email + '&image=' + reader.result;
                xhr.open('POST', 'http://localhost:8080/backend/BusinessCards/?' + query );
                xhr.send();
                location.reload();
            };
        } else {
            alert("Image need to be smaller than 10KB");
        }

    }
}

function updateCard(buttonId) {
    let id = buttonId.replace("update_", "");
    let name = document.getElementById(id + "_name").value;
    let surName = document.getElementById(id + "_surName").value;
    let telephone = document.getElementById(id + "_telephone").value;
    let email = document.getElementById(id + "_email").value;
    let image = document.getElementById(id + "_image").getAttribute("src");
    let query = 'id=' + id + '&name=' + name + '&surName=' + surName + '&telephone=' + telephone + '&email=' + email + '&image=' + image;
    xhr.open('PUT', 'http://localhost:8080/backend/BusinessCards/?' + query );
    xhr.send();
    location.reload();
}

window.addEventListener("load", main, false); // Connect the main function to window load event