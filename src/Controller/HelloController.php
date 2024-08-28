<?php

namespace App\Controller;

use App\Form\DoubleSubmitType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class HelloController extends AbstractController
{
    #[Route('/hello', name: 'app_hello')]
    public function index(Request $request): Response
    {
        $request->getSession()->set('token', md5(random_bytes(10)));
        $form = $this->createForm(DoubleSubmitType::class);
        $form->handleRequest($request);

        return $this->render('hello/index.html.twig', [
            'form' => $form,
            'controller_name' => 'HelloController',
        ]);
    }
}
