<?php

namespace App\Controller;

header('Access-Control-Allow-Origin: *');

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\DBAL\Query;

class UsuariosController extends AbstractController{

    public function findAll(){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT u.id, u.nombre, u.apPaterno, u.apMaterno, u.usuario, u.correo, u.keyword FROM App:Usuario u');
        $listUsuarios = $query->getResult();

        $data = [
            'status' => 404,
            'message' => 'No se encontraron registros'
        ];

        if(count($listUsuarios) > 0){
            $data = [
                'status' => 200,
                'message' => 'Se encontraron los registros',
                'listUsuarios' => $listUsuarios
            ];
        }

        return new JsonResponse($data);
    }

    public function findById($id){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT u.id, u.nombre, u.apPaterno, u.apMaterno, u.usuario, u.correo, u.keyword FROM App:Usuario u WHERE u.id = :id');
        $query->setParameter(':id', $id);
        $usuario = $query->getResult();

        $data = [
            'status' => 404,
            'message' => 'No se encontro el registro'
        ];

        if(count($usuario) > 0){
            $data = [
                'status' => 200,
                'message' => 'Se encontro el registro',
                'usuario' => $usuario
            ];
        }

        return new JsonResponse($data);
    }

    public function create(Request $req){
        $em = $this->getDoctrine()->getManager();

        $nombre = $req->get('nombre', null);
        $ap_paterno = $req->get('ap_paterno', null);
        $ap_materno = $req->get('ap_materno', null);
        $usuarioName = $req->get('usuario', null);
        $correo = $req->get('correo', null);
        $keyword = $req->get('keyword', null);

        $usuario = new \App\Entity\Usuario();

        $usuario->setNombre($nombre);
        $usuario->setApPaterno($ap_paterno);
        $usuario->setApMaterno($ap_materno);
        $usuario->setUsuario($usuarioName);
        $usuario->setCorreo($correo);
        $usuario->setKeyword($keyword);

        $em->persist($usuario);
        $em->flush();

        $data = [
            'status' => 200,
            'message' => 'Se registro correctamente'
        ];

        return new JsonResponse($data);
    }

    public function updatePersonalInfo(Request $req, $id){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('UPDATE App:Usuario u SET u.nombre = :nom, u.apPaterno = :appa, u.apMaterno = :apma WHERE u.id = :id');

        $nombre = $req->get('nombre', null);
        $ap_paterno = $req->get('ap_paterno', null);
        $ap_materno = $req->get('ap_materno', null);

        $query->setParameter(':nom', $nombre);
        $query->setParameter(':appa', $ap_paterno);
        $query->setParameter(':apma', $ap_materno);
        $query->setParameter(':id', $id);
        $flag = $query->getResult();

        if($flag){
            $data = [
                'status' => 200,
                'message' => 'Se actualizo correctamente'
            ];
        }else{
            $data = [
                'status' => 400,
                'message' => 'Error de actualizacion'
            ];
        }

        return new JsonResponse($data);
    }

    public function updateUserInfo(Request $req, $id){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('UPDATE App:Usuario u SET u.usuario = :user, u.correo = :email, u.keyword = :keyw WHERE u.id = :id');

        $usuario = $req->get('usuario', null);
        $correo = $req->get('correo', null);
        $keyword = $req->get('keyword', null);

        $query->setParameter(':user', $usuario);
        $query->setParameter(':email', $correo);
        $query->setParameter(':keyw', $keyword);
        $query->setParameter(':id', $id);
        $flag = $query->getResult();

        if($flag){
            $data = [
                'status' => 200,
                'message' => 'Se actualizo correctamente'
            ];
        }else{
            $data = [
                'status' => 400,
                'message' => 'Error de actualizacion'
            ];
        }

        return new JsonResponse($data);
    }

    public function remove($id){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('DELETE FROM App:Usuario u WHERE u.id = :id');
        $query->setParameter(':id', $id);
        $flag = $query->getResult();

        if($flag){
            $data = [
                'status' => 200,
                'message' => 'Se elimino correctamente'
            ];
        }else{
            $data = [
                'status' => 400,
                'message' => 'Error de eliminacion'
            ];
        }

        return new JsonResponse($data);
    }

    public function findIdByUserOrEmail(Request $req){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT u.id FROM App:Usuario u WHERE (u.usuario = :user_email OR u.correo = :user_email) AND u.keyword = :keyword ');

        $user_email = $req->get('user_email', null);
        $password = $req->get('password', null);
        $query->setParameter(':user_email', $user_email);
        $query->setParameter(':keyword', $password);

        $id = $query->getResult();

        $data = [
            'status' => 400,
            'message' => 'Usuario y/o contraseña incorrectos.',
            'id' => 0
        ];

        if(count($id) > 0){
            $data = [
                'status' => 200,
                'message' => 'Logeo exitoso, Bienvenido',
                'id' => $id[0]
            ];
        }

        return new JsonResponse($data);
    }
}
