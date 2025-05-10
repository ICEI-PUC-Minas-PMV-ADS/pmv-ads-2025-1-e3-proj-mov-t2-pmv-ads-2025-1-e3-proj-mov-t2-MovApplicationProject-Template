-- Criar tipos ENUM
CREATE TYPE tipo_transacao AS ENUM ('Receita', 'Débito');
CREATE TYPE tipo_despesa_grupo AS ENUM ('Empréstimo', 'Débito');

-- Tabela Usuarios
CREATE TABLE usuarios (
    id UUID PRIMARY KEY,
    email VARCHAR(120) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(255),
    data_criacao TIMESTAMP DEFAULT now(),
    data_atualizacao TIMESTAMP,
    data_exclusao TIMESTAMP
);
 
-- Tabela Transacoes
CREATE TABLE transacoes (
    id UUID PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    tipo tipo_transacao NOT NULL,
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    data_criacao TIMESTAMP DEFAULT now(),
    data_atualizacao TIMESTAMP,
    data_exclusao TIMESTAMP
);

-- Tabela Grupos
CREATE TABLE grupos (
    id UUID PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    descricao VARCHAR(300) NOT NULL,
    avatar_url VARCHAR(255),
    data_criacao TIMESTAMP DEFAULT now(),
    data_atualizacao TIMESTAMP,
    data_exclusao TIMESTAMP
);

-- Tabela GruposMembros
CREATE TABLE grupos_membros (
    id UUID PRIMARY KEY,
    grupo_id UUID NOT NULL REFERENCES grupos(id) ON DELETE CASCADE,
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    usuario_criador BOOLEAN NOT NULL DEFAULT FALSE,
    data_criacao TIMESTAMP DEFAULT now(),
    data_atualizacao TIMESTAMP,
    data_exclusao TIMESTAMP
);

-- Tabela DespesasGrupo
CREATE TABLE despesas_grupo (
    id UUID PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    tipo tipo_despesa_grupo NOT NULL,
    total_pago BOOLEAN NOT NULL DEFAULT FALSE,
    data_pago TIMESTAMP,
    usuario_criador BOOLEAN NOT NULL DEFAULT FALSE,
    grupo_membros_id UUID NOT NULL REFERENCES grupos_membros(id) ON DELETE CASCADE,
    data_criacao TIMESTAMP DEFAULT now(),
    data_atualizacao TIMESTAMP,
    data_exclusao TIMESTAMP
);

-- Tabela PagamentosDespesas
CREATE TABLE pagamentos_despesas (
    id UUID PRIMARY KEY,
    valor DECIMAL(10,2) NOT NULL,
    despesa_id UUID NOT NULL REFERENCES despesas_grupo(id) ON DELETE CASCADE,
    data_criacao TIMESTAMP DEFAULT now(),
    data_atualizacao TIMESTAMP,
    data_exclusao TIMESTAMP
);
