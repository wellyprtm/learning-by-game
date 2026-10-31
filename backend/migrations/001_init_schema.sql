-- Schema initialization for Game Belajar Anak (Milo si Kucing)

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    parent_pin VARCHAR(10) NOT NULL DEFAULT '1234',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS children (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL DEFAULT 5,
    avatar_cat VARCHAR(50) NOT NULL DEFAULT 'milo-orange',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS game_catalog (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    subtitle VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    icon VARCHAR(50) NOT NULL,
    theme_color VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    min_age INT DEFAULT 4,
    max_age INT DEFAULT 7,
    order_num INT NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS game_levels (
    id VARCHAR(50) PRIMARY KEY,
    game_id VARCHAR(50) NOT NULL REFERENCES game_catalog(id) ON DELETE CASCADE,
    level_code VARCHAR(20) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    order_num INT NOT NULL,
    activity_type VARCHAR(50) NOT NULL,
    items_json JSONB NOT NULL,
    unlock_stars_required INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS child_progress (
    id VARCHAR(36) PRIMARY KEY,
    child_id VARCHAR(36) NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    game_id VARCHAR(50) NOT NULL REFERENCES game_catalog(id) ON DELETE CASCADE,
    level_id VARCHAR(50) NOT NULL REFERENCES game_levels(id) ON DELETE CASCADE,
    stars INT DEFAULT 0,
    score INT DEFAULT 0,
    mastery_percentage INT DEFAULT 0,
    is_completed BOOLEAN DEFAULT FALSE,
    attempts_count INT DEFAULT 0,
    last_played_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_child_level UNIQUE (child_id, level_id)
);

CREATE TABLE IF NOT EXISTS child_rewards (
    id VARCHAR(36) PRIMARY KEY,
    child_id VARCHAR(36) NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    reward_type VARCHAR(50) NOT NULL,
    reward_code VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS activity_logs (
    id VARCHAR(36) PRIMARY KEY,
    child_id VARCHAR(36) NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    game_id VARCHAR(50) NOT NULL,
    level_id VARCHAR(50) NOT NULL,
    duration_seconds INT NOT NULL DEFAULT 0,
    correct_answers INT NOT NULL DEFAULT 0,
    wrong_answers INT NOT NULL DEFAULT 0,
    played_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_children_user_id ON children(user_id);
CREATE INDEX IF NOT EXISTS idx_game_levels_game_id ON game_levels(game_id);
CREATE INDEX IF NOT EXISTS idx_progress_child_id ON child_progress(child_id);
CREATE INDEX IF NOT EXISTS idx_rewards_child_id ON child_rewards(child_id);
CREATE INDEX IF NOT EXISTS idx_logs_child_id ON activity_logs(child_id);
