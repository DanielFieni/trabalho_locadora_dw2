package com.locadora;

import com.locadora.domain.Ator;
import com.locadora.domain.Classe;
import com.locadora.domain.Diretor;
import com.locadora.domain.Title;
import com.locadora.dto.AtorDTO;
import com.locadora.dto.ClasseDTO;
import com.locadora.dto.DiretorDTO;
import com.locadora.dto.TitleDTO;
import com.locadora.mapper.AtorMapper;
import com.locadora.mapper.ClasseMapper;
import com.locadora.mapper.DiretorMapper;
import com.locadora.mapper.TitleMapper;
import com.locadora.repository.AtorRepository;
import com.locadora.repository.ClasseRepository;
import com.locadora.repository.DiretorRepository;
import com.locadora.repository.TitleRepository;
import com.locadora.service.AtorService;
import com.locadora.service.ClasseService;
import com.locadora.service.DiretorService;
import com.locadora.service.TitleService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

@SpringBootTest
public class AtorServiceTest {

    private DiretorService diretorService;
    private AtorService atorService;
    private ClasseService classeService;
    private TitleService titleService;
    private DiretorMapper diretorMapper;
    private AtorMapper atorMapper;
    private ClasseMapper classeMapper;
    private TitleMapper titleMapper;
    private DiretorRepository diretorRepository;
    private AtorRepository atorRepository;
    private ClasseRepository classeRepository;
    private TitleRepository titleRepository;

    @BeforeEach
    public void setUp() {
        diretorMapper = mock(DiretorMapper.class);
        diretorRepository = mock(DiretorRepository.class);
        diretorService = new DiretorService(diretorRepository, diretorMapper);

        atorMapper = mock(AtorMapper.class);
        atorRepository = mock(AtorRepository.class);
        atorService = new AtorService(atorRepository, atorMapper);

        classeService = mock(ClasseService.class);

        titleRepository = mock(TitleRepository.class);
        titleMapper = mock(TitleMapper.class);
        titleService = new TitleService(titleRepository, titleMapper, atorService, classeService, diretorService);

        AtorDTO atorDTO = new AtorDTO(1, "Daniel");
        ClasseDTO classeDTO = new ClasseDTO(1, "Comedia", 100, 50);
        DiretorDTO diretorDTO = new DiretorDTO(1, "Sylvester Stallone");

        when(atorService.insertAtor(atorDTO)).thenReturn(atorDTO);
        when(classeService.insertClasse(classeDTO)).thenReturn(classeDTO);
        when(diretorService.insertDiretor(diretorDTO)).thenReturn(diretorDTO);
    }

    @Test
    public void testInsertDiretor() {
        // Configurar objetos de teste
        DiretorDTO inputDTO = new DiretorDTO(1, "Sylvester Stallone");
        Diretor diretorEntity = new Diretor(1, "Sylvester Stallone");
        DiretorDTO outputDTO = new DiretorDTO(1, "Sylvester Stallone");

        // Configurar comportamento de mocks
        when(diretorMapper.toEntity(inputDTO)).thenReturn(diretorEntity);
        when(diretorRepository.save(diretorEntity)).thenReturn(diretorEntity);
        when(diretorMapper.toDTO(diretorEntity)).thenReturn(outputDTO);

        // Chamar o método a ser testado
        DiretorDTO resultDTO = diretorService.insertDiretor(inputDTO);

        // Verificar resultados
        Assertions.assertEquals(inputDTO.getId(), resultDTO.getId());
        Assertions.assertEquals(inputDTO.getName(), resultDTO.getName());

        // Verificar interações com os mocks
        verify(diretorMapper).toEntity(inputDTO);
        verify(diretorRepository).save(diretorEntity);
        verify(diretorMapper).toDTO(diretorEntity);
    }

    @Test
    public void testInsertAtor() {
        AtorDTO input = new AtorDTO(1, "Daniel");
        Ator entity = new Ator(1, "Daniel");
        AtorDTO output = new AtorDTO(1, "Daniel");

        when(atorMapper.toEntity(input)).thenReturn(entity);
        when(atorRepository.save(entity)).thenReturn(entity);
        when(atorMapper.toDTO(entity)).thenReturn(output);

        AtorDTO result = atorService.insertAtor(input);
        Assertions.assertEquals(input.getName(), result.getName());

        verify(atorMapper).toEntity(input);
        verify(atorRepository).save(entity);
        verify(atorMapper).toDTO(entity);
    }

    @Test
    public void testDeleteAtor() {

//        Ator ator = new Ator(1, "Daniel");
//
//        when(atorRepository.findById(1)).thenReturn(Optional.of(ator));
//
//        atorService.deleteAtor(1);
//
//        verify(atorRepository, times(1)).delete(ator);


    }

    @Test
    public void testDeleteAtorWithTitle() {

        ClasseDTO classeDTO = new ClasseDTO(1, "Comedia", 100, 50);
        AtorDTO atorDTO = new AtorDTO(1, "Daniel");
        DiretorDTO diretorDTO = new DiretorDTO(1, "Silveste Stallone");

        when(atorService.insertAtor(atorDTO)).thenReturn(atorDTO);

        Ator ator = new Ator(1, "Daniel");
        Classe classe = new Classe(1, "Comedia", 100, 50);
        Diretor diretor = new Diretor(1, "Silveste Stallone");


        TitleDTO inputDTO = new TitleDTO(1, "Turtle", 10, "A história de tartarugas", "Drama", atorDTO, classeDTO, diretorDTO);
        Title titleEntity = new Title(1, "Turtle", 10, "A história de tartarugas", "Drama", ator, classe, diretor);
        TitleDTO outputDTO = new TitleDTO(1, "Turtle", 10, "A história de tartarugas", "Drama", atorDTO, classeDTO, diretorDTO);

        when(titleMapper.toEntity(inputDTO)).thenReturn(titleEntity);
        when(titleRepository.save(titleEntity)).thenReturn(titleEntity);
        when(titleMapper.toDTO(titleEntity)).thenReturn(outputDTO);

        TitleDTO result = titleService.insertTitle(inputDTO);
        Assertions.assertEquals(inputDTO.getName(), result.getName());
        Assertions.assertEquals(inputDTO.getYear(), result.getYear());
        Assertions.assertEquals(inputDTO.getCategory(), result.getCategory());
        Assertions.assertEquals(inputDTO.getSynopsis(), result.getSynopsis());

        verify(titleMapper).toEntity(inputDTO);
        verify(titleRepository).save(titleEntity);
        verify(titleMapper).toDTO(titleEntity);

    }

}
