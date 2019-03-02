package com.nasaapp;



import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import com.squareup.picasso.Picasso;
import org.json.JSONException;
import org.json.JSONObject;

public class DemoActivity extends AppCompatActivity {

    TextView heading,detail;
    ImageView imageBg;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_demo);
        heading = findViewById(R.id.heading);
        detail = findViewById(R.id.detail);
        imageBg = findViewById(R.id.imageBg);
        String data = getIntent().getStringExtra("item");
        try {
            JSONObject obj = new JSONObject(data);
            heading.setText(obj.getString("title"));
            detail.setText(obj.getString("explanation"));
            Picasso.get().load(obj.getString("url")).into(imageBg);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void goBack(View view) {
        onBackPressed();
    }
}
