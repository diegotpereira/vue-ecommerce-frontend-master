const baseURL = "http://remotedvs.org:8080/api/"
const urlBuscarProduto = baseURL + "produto/";
const urlAtualizarProduto = baseURL + "produto/atualizar";
const urlAddProduto = baseURL + "produto/add"

const app = Vue.createApp({
    data() {
        return {
            produtos: null,
            showAddForm: false,

            //campos para entradas de formulário
            temNome: "",
            tempDescricao: "",
            tempPreco: "",
            tempImageURL: "",
        }
    },

    methods: {
        redefinirCamposEntrada: function() {
            this.temNome="";
            this.tempDescricao="";
            this.tempPreco="";
            this.tempImageURL="";
        },

        //ADICIONE Funcionalidade do Produto
        addProdutoBotaoPressionado: function() {
            this.showAddForm = false;

            const novoProduto = {
                id: this.produtos.length+1,
                nome: this.temNome,
                descricao: this.tempDescricao,
                preco: this.tempPreco,
                imageURL: this.imageURL
            }

            // a solicitação POST para API
            await fetch(urlAddProduto, {
                method: "POST",
                body: JSON.stringify(novoProduto),
                headers: {
                    'Content-Type':'application/json'
                }
            })
            .then((res) => {
                this.produtos.push(novoProduto);
                alert("Produto adicionado com sucesso1!")
            })
            .catch((erro)=>console.log(erro));
        },

        // EDITAR Funcionalidade do Produto
        editBotaoPressionado: function(index) {
            const curProduto = this.produtos[index];

            // alternar o formulário
            curProduto.showEditForm = !curProduto.showEditForm;

            // definindo os campos de entrada de acordo com o produto atual
            this.temNome = curProduto.nome;
            this.tempDescricao = curProduto.descricao;
            this.tempPreco = curProduto.preco;
            this.tempImageURL = curProduto.imageURL;
        },

        editProduto : async function(index) {
            //feche o formulário após clicar em enviar
            this.produtos[index].showEditForm = false;

            // Criando o novo produto
            const novoProduto = {
                id: this.produtos[index].id,
                nome: this.temNome,
                descricao: this.tempDescricao,
                preco: this.tempPreco,
                imageURL: this.tempImageURL
            }

            //atualizando o objeto atual
            this.produtos[index] =  novoProduto;

            //redefinindo os campos de entrada
            this.redefinirCamposEntrada();

            const url = urlAtualizarProduto + novoProduto.id.toString(10);

            //a solicitação POST para API
            await fetch(url, {
                method: "POST",
                body: JSON.stringify(novoProduto),
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            .then((res) => alert("Produto atualizado com sucesso!."))
            .catch((erro) => console.log(erro));
        }
    },

    //a função montada para encontrar os dados antes de renderizar o aplicativo
    mounted: async function mounted() {
        const response = await fetch(urlBuscarProduto);
        this.produtos = await response.json();
        for(produto of this.produtos) {
            produto.showEditForm = false;
        }
    },
});

app.mount("#app");