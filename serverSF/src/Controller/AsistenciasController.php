<?php

namespace App\Controller;

header('Access-Control-Allow-Origin: *');

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\DBAL\Query;

class AsistenciasController extends AbstractController{

    public function findAll(){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT a.id, a.idusuario, a.idevento FROM App:Asistencia a');
        $listAsistencias = $query->getResult();

        $data = [
            'status' => 404,
            'message' => 'No se encontraron registros'
        ];

        if(count($listAsistencias) > 0){
            $data = [
                'status' => 200,
                'message' => 'Se encontraron los registros',
                'listAsistencias' => $listAsistencias
            ];
        }

        return new JsonResponse($data);
    }

    public function findById($id){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT a.id, a.idusuario, a.idevento FROM App:Asistencia a WHERE a.id = :id');
        $query->setParameter(':id', $id);
        $asistencia = $query->getResult();

        $data = [
            'status' => 404,
            'message' => 'No se encontro el registro'
        ];

        if(count($asistencia) > 0){
            $data = [
                'status' => 200,
                'message' => 'Se encontro el registro',
                'asistencia' => $asistencia
            ];
        }

        return new JsonResponse($data);
    }

    public function countAsistencias($id_evento){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT COUNT(a.idevento) FROM App:Asistencia a WHERE a.idevento = :id_evento');
        $query->setParameter(':id_evento', $id_evento);
        $asistencias = $query->getResult();

        $data = [
            'status' => 404,
            'message' => 'No se encontro el registro'
        ];

        if(count($asistencias) > 0){
            $data = [
                'status' => 200,
                'message' => 'Se encontro el registro',
                'asistencias' => $asistencias
            ];
        }

        return new JsonResponse($data);
    }

    public function create(Request $req){
        $em = $this->getDoctrine()->getManager();

        $id_usuario = $req->get('id_usuario', null);
        $id_evento = $req->get('id_evento', null);

        $asistencia = new \App\Entity\Asistencia();

        $asistencia->setIdUsuario($id_usuario);
        $asistencia->setIdEvento($id_evento);

        $em->persist($asistencia);
        $em->flush();

        $data = [
            'status' => 200,
            'message' => 'Se registro correctamente'
        ];

        return new JsonResponse($data);
    }

    public function update(Request $req, $id){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('UPDATE App:Asistencia a SET a.idusuario = :idus, a.idevento = :ideve WHERE a.id = :id');

        $id_usuario = $req->get('id_usuario', null);
        $id_evento = $req->get('id_evento', null);

        $query->setParameter(':idus', $id_usuario);
        $query->setParameter(':ideve', $id_evento);
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
        $query = $em->createQuery('DELETE FROM App:Asistencia WHERE a.id = :id');
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
}
