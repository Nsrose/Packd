package averages;

/** Class for info node representing a packet from a user.
    @author Nick Rose.*/
class InfoNode {
    /** What day it is.*/
    private String day;

    /** What hour it is.*/
    private int hour;

    /** Measure of how crowded it is, on a scale from 1 to 4.*/
    private int measure;

    /** A new info node on a day at an hour with some measure of 
        how crowded it is.*/
    public InfoNode(String day, int hour, int measure) {
        this.day = day;
        this.hour = hour;
        this.measure = measure;
    }

    /** Reassign my measure to MEASURE. */
    public void changeMeasure(int measure) {
        this.measure = measure;
    }

    /** Return my day. */
    public String getDay() {
        return day;
    }

    /** Return my hour. */
    public int getHour() {
        return hour;
    }

    /** Return my measure. */
    public int getMeasure() {
        return measure;
    }
}
