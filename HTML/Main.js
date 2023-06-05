async function listLivros() {
    try {
        const response = await fetch('http://localhost:8080/livros', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await response.json();
        var lista = document.getElementById('lista');
        lista.innerHTML = '';
        result.forEach(livroModel => {
            var linha = document.createElement('tr');

            var id = document.createElement('td');
            id.innerHTML = '<a href="javascript:selecionarLivro(\'' + livroModel.id_livro + '\');">' + livroModel.id_livro + '</a>';
            linha.appendChild(id);

            var titulo = document.createElement('td');
            titulo.innerHTML = livroModel.nome_livro;
            linha.appendChild(titulo);

            var autor = document.createElement('td');
            autor.innerHTML = livroModel.autor_livro;
            linha.appendChild(autor);

            var editora = document.createElement('td');
            editora.innerHTML = livroModel.editora_livro;
            linha.appendChild(editora);

            var ano = document.createElement('td');
            ano.innerHTML = livroModel.ano_livro;
            linha.appendChild(ano);

            var preco = document.createElement('td');
            preco.innerHTML = livroModel.preco_livro;
            linha.appendChild(preco);


            var acoes = document.createElement('td');
            acoes.innerHTML = '<button onClick="deletarLivro(\'' + livroModel.id_livro + '\');">x</button>';
            linha.appendChild(acoes);

            lista.appendChild(linha);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

const uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

async function cadastrarLivro() {
    var Livro = {
        "id_livro": uuidv4(),
        "nome_livro": document.getElementById('detail-nome_livro').value,
        "autor_livro": document.getElementById('detail-autor_livro').value,
        "editora_livro": document.getElementById('detail-editora_livro').value,
        "ano_livro": document.getElementById('detail-ano_livro').value,
        "preco_livro": document.getElementById('detail-preco_livro').value   
    }
    let envio = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Livro)
    };
    
    try {
       let response = await fetch("http://localhost:8080/livros/post", envio);
       listLivros();
       if (response.ok) {
            console.log('Livro cadastrado com sucesso');
            alert('Livro cadastrado com sucesso');
            listLivros();
        } else {
            console.error('Falha ao cadastrar o livro:', response.status, response.statusText);
            alert('Falha ao cadastrar o livro:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição do cadastro:', error);
        alert('Erro na requisição do cadastro:', error);
    }
}

async function atualizarLivro(id) {
    id = document.getElementById('detail-id_livro').value;
    let = Livro = {
        "id_livro": document.getElementById('detail-id_livro').value,
        "nome_livro": document.getElementById('detail-nome_livro').value,
        "autor_livro": document.getElementById('detail-autor_livro').value,
        "editora_livro": document.getElementById('detail-editora_livro').value,
        "ano_livro": document.getElementById('detail-ano_livro').value,
        "preco_livro": document.getElementById('detail-preco_livro').value
    }

    try {
        const response = await fetch(`http://localhost:8080/livros/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Livro)
        });
    
        if (response.ok) {
            console.log('Livro atualizado com sucesso');
            alert('Livro atualizado com sucesso');
            listLivros();
        } else {
            console.error('Falha ao atualizar o livro:', response.status, response.statusText);
            alert('Falha ao atualizar o livro:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição de Update:', error);
        alert('Erro na requisição de Update:', error);
    }
    listLivros();
    
}


async function deletarLivro(id) {
    try {
        const response = await fetch(`http://localhost:8080/livros/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        listLivros();
    } catch (error) {
        console.error('Erro na requisição de Delete:', error);
        alert('Erro na requisição de Delete:', error);
    }
}

async function selecionarLivro(id) {
    try {
        const result = await fetch(`http://localhost:8080/livros/buscar/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        var livro = await result.json();
        document.getElementById('detail-id_livro').value = livro.id_livro;
        document.getElementById('detail-nome_livro').value = livro.nome_livro;
        document.getElementById('detail-autor_livro').value = livro.autor_livro;
        document.getElementById('detail-editora_livro').value = livro.editora_livro;
        document.getElementById('detail-ano_livro').value = livro.ano_livro;
        document.getElementById('detail-preco_livro').value = livro.preco_livro;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function pesquisarLivro() {

    document.getElementById('lista').innerHTML = '';

    var buscarLivro = document.getElementById('busca').value.toString();

    try {
        const response = await fetch(`http://localhost:8080/livros`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();
        let livrosEncontrados = [];
        result.forEach(livro => {
            if (
                livro.nome_livro.toLowerCase().includes(buscarLivro.toLowerCase()) || livro.autor_livro.toLowerCase().includes(buscarLivro.toLowerCase())) {
                    livrosEncontrados.push(livro);   
            }
        });
        livrosEncontrados.forEach(livroModel => {
            var linha = document.createElement('tr');

            var id = document.createElement('td');
            id.innerHTML = '<a href="javascript:selecionarLivro(\'' + livroModel.id_livro + '\');">' + livroModel.id_livro + '</a>';
            linha.appendChild(id);

            var titulo = document.createElement('td');
            titulo.innerHTML = livroModel.nome_livro;
            linha.appendChild(titulo);

            var autor = document.createElement('td');
            autor.innerHTML = livroModel.autor_livro;
            linha.appendChild(autor);

            var editora = document.createElement('td');
            editora.innerHTML = livroModel.editora_livro;
            linha.appendChild(editora);

            var ano = document.createElement('td');
            ano.innerHTML = livroModel.ano_livro;
            linha.appendChild(ano);

            var preco = document.createElement('td');
            preco.innerHTML = livroModel.preco_livro;
            linha.appendChild(preco);


            var acoes = document.createElement('td');
            acoes.innerHTML = '<button onClick="deletarLivro(\'' + livroModel.id_livro + '\');">x</button>';
            linha.appendChild(acoes);

            document.getElementById('lista').appendChild(linha);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

//Resetar as barras de pesquisa
async function calvarLivro() {
    document.getElementById('detail-id_livro').value = '';
    document.getElementById('detail-nome_livro').value = '';
    document.getElementById('detail-autor_livro').value = '';
    document.getElementById('detail-editora_livro').value = '';
    document.getElementById('detail-ano_livro').value = '';
    document.getElementById('detail-preco_livro').value = '';
}

async function buscarLivro() {
    try{
        const result = await fetch(`http//localhost:8080/livros/buscar`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        var livrosPesq = await result.json();
        document.getElementById('detail-id_livro').value = livro.id;
        document.getElementById('detail-nome_livro').value = livro.nome;
        document.getElementById('detail-autor_livro').value = livro.autor;
        document.getElementById('detail-editora_livro').value = livro.editora;
        document.getElementById('detail-ano_livro').value = livro.ano;
        document.getElementById('detail-preco_livro').value = livro.preco;

    } catch (error) {
    console.error("Error:", error);
    }
    
    
}

