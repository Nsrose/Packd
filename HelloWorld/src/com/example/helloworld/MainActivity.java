package com.example.helloworld;

import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import com.firebase.client.Firebase;
import com.firebase.client.*;
import android.widget.TextView;
import android.view.View;


public class MainActivity extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        Firebase f = new Firebase("https://android.firebaseio-demo.com/");
        f.addValueEventListener(new ValueEventListener() {
        	
        	@Override
        	public void onDataChange(DataSnapshot arg0) {
        		TextView newsFeed = (TextView) findViewById(R.id.newsfeed);
        		newsFeed.setText(arg0.getValue(String.class));
        	}
        	
        	@Override
        	public void onCancelled(FirebaseError error) {
        		
        	}
        });
    }
    
    public void sunny(View view) {
    	Firebase f = new Firebase("https://android.firebaseio-demo.com/");
    	f.setValue("Sunny!");
    	
    }
    
    public void foggy(View view) {
    	Firebase f = new Firebase("https://android.firebaseio-demo.com/");
    	f.setValue("Foggy...");
    	
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
