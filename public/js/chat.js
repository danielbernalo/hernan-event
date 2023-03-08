
    const chatList = document.querySelector(".chat-lists");
    const template = document.getElementById("bot-template");
    const userTemplate = document.getElementById("user-template");

    function removeTags(string, array) {
        return array ? string.split("<").filter(function (val) {
            return f(array, val);
        }).map(function (val) {
            return f(array, val);
        }).join("") : string.split("<").map(function (d) {
            return d.split(">").pop();
        }).join("");

        function f(array, value) {
            return array.map(function (d) {
                return value.includes(d + ">");
            }).indexOf(true) != -1 ? "<" + value : value.split(">")[1];
        }
    }


    function startAudio() {
        document.getElementById("audiooutput").play();

    }


    function intro() {

        var strIntro = [
            "<p>Hola!</p>",
            "<p>Un gusto para mi saludarte!</p>",
            "<p>Que lindo tenerte por acá</p>",
            "<p>Soy un bot, te mostraré opciones con las que puedo ayudarte</p>"
        ]


        var tiempo = 0000;

        for (var i = 0; i < strIntro.length; i++) {

            var cuantasletras = strIntro[i].length;
            if (cuantasletras > 100) {
                cuantasletras = 100;
            }


            const element = template.cloneNode(true);
            element.removeAttribute("hidden");

            const bodyElement = element.querySelector(".chat-content");
            bodyElement.innerHTML = strIntro[i];


            setTimeout(function () {
                chatList.appendChild(element);
                document.getElementById("audiooutput").play();
                chatList.scrollIntoView({block: 'end', behavior: 'smooth'});
            }, tiempo);


            tiempo = tiempo + (cuantasletras * 20);
            console.log("tiempo", tiempo)
            // document.getElementById("esperando").innerHTML = "<img src='images/avatar2.png' class='avatar'><div id='typing-loader'></div>";
            document.getElementById("esperando").style.display = "block";

        }


        setTimeout(function () {

            // document.getElementById("esperando").innerHTML = "";
            document.getElementById("esperando").style.display = "none";

            document.getElementById('opcionesdiv').style.display = "block";
            document.getElementById("opcionesdiv").style.opacity = "1";

            document.getElementById("opcionestit").scrollIntoView({block: 'start', behavior: 'smooth'});

        }, tiempo);

    }


    function showReply(str, direct, textInput, callback) {
        if (str === "") {

            return;
        } else {


            document.getElementById("opcionesdiv").style.display = 'none';

            if (direct !== "yes") {
                var botoncito = event.target.textContent;
                event.target.style.display = 'none';
            } else {
                var botoncito = textInput;
                chatList.innerHTML = "";
            }


            // botoncito = "<li class='liquestion'><p class='question'>" + botoncito + "</p></li>";
            const element = userTemplate.cloneNode(true);
            element.removeAttribute("hidden");
            const bodyElement = element.querySelector(".chat-content");
            bodyElement.innerHTML = botoncito;

            chatList.appendChild(element);
            // chatList.lastChild.classList.add("sendinganimation");

            fetch("/bot?q=".concat(str)).then(i => i.json())
                .then(messages => showMessages(messages, direct, str))

        }

    }

    function showMessages(messages, direct, str) {

        document.getElementById("audiooutput").play();
        document.getElementById("esperando").style.display = "block";
        document.getElementById("esperando").scrollIntoView({block: 'end', behavior: 'smooth'});

        var strArray = messages.messages
        var tiempo = 0000;

        for (var i = 0; i < strArray.length; i++) {

            var cuantasletras = strArray[i].length;
            if (cuantasletras > 100) {
                cuantasletras = 100;
            }
            tiempo = tiempo + (cuantasletras * 15);


            const element = template.cloneNode(true);
            element.removeAttribute("hidden");

            const bodyElement = element.querySelector(".chat-content");
            bodyElement.innerHTML = strArray[i];


            setTimeout(function () {
                chatList.appendChild(element);
                document.getElementById("audiooutput").play();
                chatList.scrollIntoView({block: 'end', behavior: 'smooth'});
            }, tiempo);


            tiempo = tiempo;
            console.log("tiempo", tiempo)
        }

        setTimeout(function () {
            if (direct === "yes") {
                showOptions(str, 'yes', messages.options);
            } else {
                showOptions(str, "no", messages.options);
            }

        }, tiempo);

        history.pushState(null, null, "#" + i);
        tiempo = "";
    }

    function showReplyFromParent(lanzar, texto) {
        document.getElementById("opciones").innerHTML = "";
        showReply(lanzar, 'yes', texto);

    }

    function cleanUp() {
        chatList.innerHTML = "";
        document.getElementById("opcionesdiv").style.display = "none";
        for (var i = 0; i <= 20; i++) {
            clearTimeout(i);
        }
    }


    function showOptions(str, direct, options) {
        if (str == "") {
            document.getElementById("opciones").innerHTML = "";
            return;
        } else {

            document.getElementById("esperando").style.display = "block";

            if (direct != "yes") {
                chatList.scrollIntoView({block: 'end', behavior: 'smooth'});
            }


            document.getElementById("esperando").style.display = "none";
            document.getElementById("opcionesdiv").style.opacity = "1";
            document.getElementById("opcionesdiv").style.display = "block";
            document.getElementById("opciones").innerHTML = options;


            if (window.matchMedia("(max-width: 500px)").matches) {
                document.querySelector("#opciones li:nth-of-type(2)").scrollIntoView({
                    block: 'end',
                    behavior: 'smooth'
                });

            } else {
                document.querySelector("#opciones li:nth-of-type(2)").scrollIntoView({
                    block: 'end',
                    behavior: 'smooth'
                });

            }

        }

    };

    function sendReply(section, value) {
        document.getElementById("opcionesdiv").style.display = 'none';
        const element = userTemplate.cloneNode(true);
        element.removeAttribute("hidden");
        const bodyElement = element.querySelector(".chat-content");
        bodyElement.innerHTML = value;
        chatList.appendChild(element);
        const item = sessionStorage.getItem("rsvp")
        const rsvp = item ? JSON.parse(item) : {}
        rsvp[section] = value
        console.log(rsvp)
        sessionStorage.setItem("rsvp", JSON.stringify(rsvp))

        let next = "rsvp"

        if (section === "adultos") next = "ninios"
        else if (section === "ninios") next = "alimentos"
        else if (section === "alimentos") next = "transporte"
        else if (section === "transporte") next = "finishing"
        if (next !== "finishing") {
            fetch("/bot?q=".concat(next)).then(i => i.json())
                .then(messages => showMessages(messages, "yes", 'str'))
        } else {
            fetch("/bot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(rsvp)
            }).then(i => i.json())
                .then(messages => showMessages(messages, "yes", 'str'))
                .catch(e => {
                    alert(e)
                })
        }
    }

    function sendText(campo, next) {

        if (campo === "") return
        document.getElementById("opcionesdiv").style.display = 'none';
        const botoncito = document.getElementById(campo);
        const contenidocampo = botoncito.value.replace(/(<([^>]+)>)/ig, "");
        const element = userTemplate.cloneNode(true);
        element.removeAttribute("hidden");
        const bodyElement = element.querySelector(".chat-content");
        bodyElement.innerHTML = contenidocampo;
        chatList.appendChild(element);

        const item = sessionStorage.getItem("rsvp")
        const rsvp = item ? JSON.parse(item) : {}
        rsvp[campo] = contenidocampo
        console.log(rsvp)
        sessionStorage.setItem("rsvp", JSON.stringify(rsvp))

        fetch("/bot?q=".concat(next)).then(i => i.json())
            .then(messages => showMessages(messages, "yes", 'str'))

    }

    intro()