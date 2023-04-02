package edu.ssafy.punpun.s3;

import io.findify.s3mock.S3Mock;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.Map;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@Import(S3MockConfig.class)
@SpringBootTest
class S3ImageUploaderTest {

    @Autowired
    private S3Mock s3Mock;
    @Autowired
    private S3Uploader awsS3Uploader;

    @AfterEach
    public void tearDown() {
        s3Mock.stop();
    }

    @Test
    void upload() throws IOException {
        // given
        String path = "test.png";
        String contentType = "image/png";
        String dirName = "test";

        MockMultipartFile file = new MockMultipartFile("test", path, contentType, "test".getBytes());

        // when
        Map<String, String> urlPath = awsS3Uploader.upload(file, dirName);
        String uploadName = urlPath.get("uploadName");
        String uploadUrl = urlPath.get("uploadUrl");

        // then
        assertThat(uploadUrl).contains(path);
//        assertThat(uploadName).contains(dirName);
    }
}