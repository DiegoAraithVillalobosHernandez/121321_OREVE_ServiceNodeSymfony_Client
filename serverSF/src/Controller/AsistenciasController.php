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
        $query = $em->createQuery('SELECT a.id, a.idUsuario, a.idEvento FROM App:Asistencia a');
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
        $query = $em->createQuery('SELECT a.id, a.idUsuario, a.idEvento FROM App:Asistencia a WHERE a.id = :id');
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

    public function countAsistencias($idevento){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT COUNT(a.idEvento) FROM App:Asistencia a WHERE a.idEvento = :idevento');
        $query->setParameter(':idevento', $idevento);
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

        $idusuario = $req->get('idusuario', null);
        $idevento = $req->get('idevento', null);

        $asistencia = new \App\Entity\Asistencia();

        $asistencia->setIdUsuario($idusuario);
        $asistencia->setIdEvento($idevento);

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
        $query = $em->createQuery('UPDATE App:Asistencia a SET a.idUsuario = :idus, a.idEvento = :ideve WHERE a.id = :id');

        $idusuario = $req->get('idusuario', null);
        $idevento = $req->get('idevento', null);

        $query->setParameter(':idus', $idusuario);
        $query->setParameter(':ideve', $idevento);
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
        $query = $em->createQuery('DELETE FROM App:Asistencia a WHERE a.id = :id');
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
