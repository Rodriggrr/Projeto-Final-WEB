// Vê se o usuário está logado, se não, redireciona para a página de erro 404.
// Prefere-se fazer no backend, mas ainda não sei como fazer.
if(!sessionStorage.getItem('jwtToken')) {
    window.location.href = '../404';
}

function logout() {
    if (confirm('Tem certeza que deseja encerrar a sessão?')) {
        sessionStorage.removeItem('jwtToken');
        window.location.href = '../home';
    }
}