using UnityEngine.UI;
using UnityEngine;

public class ScoreManager : MonoBehaviour {

	[SerializeField]
	private Text scoreText;
	[SerializeField]
	private Text highscoreText;
	[SerializeField]
	private PlayerController player;
	private int score = 0;
	private int highscore;

	void Start () {
		scoreText = GameObject.FindGameObjectWithTag("Score")
			.GetComponent<Text>();
		
		player = FindObjectOfType<PlayerController>();
		
		highscoreText = GameObject.FindGameObjectWithTag("Highscore")
			.GetComponent<Text>();

		highscore = PlayerPrefs.GetInt("Highscore", 0);
	}
	
	void Update () {
		score = (int)player.transform.position.z/5;
		scoreText.text = "Score: " + score.ToString();
		if(score > highscore) {
			highscore = score;
			PlayerPrefs.SetInt("Highscore", highscore);
		}
		highscoreText.text = "Highscore: " + highscore.ToString();
	}
}
