<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Asistencia
 *
 * @ORM\Table(name="asistencia")
 * @ORM\Entity
 */
class Asistencia
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_usuario", type="integer", nullable=true)
     */
    private $idUsuario;

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_evento", type="integer", nullable=true)
     */
    private $idEvento;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdUsuario(): ?int
    {
        return $this->idUsuario;
    }

    public function setIdUsuario(?int $idUsuario): self
    {
        $this->idUsuario = $idUsuario;

        return $this;
    }

    public function getIdEvento(): ?int
    {
        return $this->idEvento;
    }

    public function setIdEvento(?int $idEvento): self
    {
        $this->idEvento = $idEvento;

        return $this;
    }


}
