-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 14-Jul-2024 às 08:46
-- Versão do servidor: 10.4.20-MariaDB
-- versão do PHP: 7.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `autenticacao_db`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `novidades`
--

CREATE TABLE `novidades` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `data_criacao` date NOT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `novidades`
--

INSERT INTO `novidades` (`id`, `titulo`, `descricao`, `data_criacao`, `id_usuario`) VALUES
(1, 'teste', 'teste', '2024-07-14', 1),
(2, 'teste 1', 'teste 1', '2024-07-14', 1),
(5, 'teste', 'teste', '2024-07-15', 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos`
--

CREATE TABLE `produtos` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `preco` varchar(255) NOT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  `quantidade` varchar(255) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `produtos`
--

INSERT INTO `produtos` (`id`, `nome`, `preco`, `imagem`, `quantidade`, `descricao`, `id_usuario`) VALUES
(1, 'Produto 1', '1000', '/uploads/1720934663707-perfume 1.jpg', '10', 'Produto 1', 1),
(2, 'Produto 2', '100', '/uploads/1720934718449-Perfume.jpg', '10', 'Produto 2', 1),
(3, 'Produto 1', '10', '/uploads/1720934768049-Perfume.jpg', '10', 'Produto 1', 2),
(4, 'Produto 2', '200', '/uploads/1720934822648-Perfume 2.png', '10', 'Produto 2', 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `acesso` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `acesso`) VALUES
(1, 'Ana', 'ana@gmail.com', '$2b$10$7jOTcr.SZiWMdRxeuJUmWOF5eNLlfbHKcXR3kbds2nZXriAiF1jjy', 'admin'),
(2, 'Mario', 'mario@gmail.com', '$2b$10$HW8I6jBDj23nTSqAoIPZUeDKTRxWwJN0DjVduQX49CDOkpwT/6bia', 'usuario');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `novidades`
--
ALTER TABLE `novidades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_novidades_usuarios` (`id_usuario`);

--
-- Índices para tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_produtos_usuarios` (`id_usuario`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `novidades`
--
ALTER TABLE `novidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `novidades`
--
ALTER TABLE `novidades`
  ADD CONSTRAINT `fk_novidades_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Limitadores para a tabela `produtos`
--
ALTER TABLE `produtos`
  ADD CONSTRAINT `fk_produtos_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
