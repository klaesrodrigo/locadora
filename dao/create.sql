
CREATE SCHEMA IF NOT EXISTS `locadora` DEFAULT CHARACTER SET utf8 ;
USE `locadora` ;



CREATE TABLE IF NOT EXISTS `locadora`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `locadora`.`filme` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(70) NOT NULL,
  `diretor` VARCHAR(70) NOT NULL,
  `flgDisponivel` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `locadora`.`usuario_has_filme` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `filme_id` INT NOT NULL,
  `flgDevolvido` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`, `usuario_id`, `filme_id`),
  INDEX `fk_usuario_has_filme_filme1_idx` (`filme_id` ASC),
  INDEX `fk_usuario_has_filme_usuario_idx` (`usuario_id` ASC),
  CONSTRAINT `fk_usuario_has_filme_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `locadora`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_filme_filme1`
    FOREIGN KEY (`filme_id`)
    REFERENCES `locadora`.`filme` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
