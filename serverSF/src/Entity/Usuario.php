<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Usuario
 *
 * @ORM\Table(name="usuario", uniqueConstraints={@ORM\UniqueConstraint(name="correo", columns={"correo"})})
 * @ORM\Entity
 */
class Usuario
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
     * @var string
     *
     * @ORM\Column(name="nombre", type="string", length=150, nullable=false)
     */
    private $nombre;

    /**
     * @var string
     *
     * @ORM\Column(name="ap_paterno", type="string", length=50, nullable=false)
     */
    private $apPaterno;

    /**
     * @var string|null
     *
     * @ORM\Column(name="ap_materno", type="string", length=50, nullable=true)
     */
    private $apMaterno;

    /**
     * @var string
     *
     * @ORM\Column(name="correo", type="string", length=200, nullable=false)
     */
    private $correo;

    /**
     * @var string
     *
     * @ORM\Column(name="keyword", type="string", length=15, nullable=false)
     */
    private $keyword;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): self
    {
        $this->nombre = $nombre;

        return $this;
    }

    public function getApPaterno(): ?string
    {
        return $this->apPaterno;
    }

    public function setApPaterno(string $apPaterno): self
    {
        $this->apPaterno = $apPaterno;

        return $this;
    }

    public function getApMaterno(): ?string
    {
        return $this->apMaterno;
    }

    public function setApMaterno(?string $apMaterno): self
    {
        $this->apMaterno = $apMaterno;

        return $this;
    }

    public function getCorreo(): ?string
    {
        return $this->correo;
    }

    public function setCorreo(string $correo): self
    {
        $this->correo = $correo;

        return $this;
    }

    public function getKeyword(): ?string
    {
        return $this->keyword;
    }

    public function setKeyword(string $keyword): self
    {
        $this->keyword = $keyword;

        return $this;
    }


}
